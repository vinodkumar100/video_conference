import AgoraUIKit from "agora-react-uikit";
import React, { useEffect, useState, useRef } from 'react';
import token from './token.json';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import axios from 'axios';
import { Fab } from "@mui/material";
import { database } from './firebaseConfig';
import { ref, set,onValue } from "firebase/database";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { hostUrl } from "./endpoint";


function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function CallView(props) {
    const { hostRoomId, setIsCallHosted } = props
    const [isHost, setHost] = useState(true);
    const [openTranscription, setOpenTranscription] = useState(false);
    const [transcription, setTranscription] = useState('');
    const [transulation, setTransulation] = useState('');
    const [language, setLanguage] = useState('en');
    const [value, setValue] = React.useState(0);

    SpeechRecognition.startListening({ continuous: true });

    const languages=[
        {
            id:"en",
            name:"English-EN"
        },
        {
            id:'te',
            name:'Telugu-TE'
        },
        {
            id:'hi',
            name:'Hindi-HI'
        },
        {
            id:'es',
            name:'Spanish-ES'
        }
    ]
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();

    useEffect(() => {
        const starCountRef = ref(database, 'chat/' + hostRoomId);
        onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();
            setTranscription(data.original);
        });
      }, []);


    const translateText = async (text, targetLanguage) => {        
        // const hostUrl=window.location.origin;
        const url = `${hostUrl}/api/translate/translate`;
        const response = await axios.post(
            url,
            {
                text: text,
                targetLanguage: targetLanguage,
            }
        );
        return response.data;
    };

    const translateContinuousText = async () => {
        const translatedText = await translateText(transcript, language);
        const savedData = localStorage.getItem('chat');
        const { isHost } = JSON.parse(savedData);
        if(isHost){
            set(ref(database, 'chat/' + hostRoomId), {
                original: transcript,
                transulation: translatedText,
            });
        }
        setTransulation(translatedText);
    };

    if (true) {
        translateContinuousText();
    }

    if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>;
    }


    return (
        <div className="App">
            <Fab color="primary" aria-label="add"
                style={{ position: 'absolute', top: '20px', right: openTranscription ? '20vw' : '20px' }}
                onClick={() => setOpenTranscription(!openTranscription)}>
                {
                    !openTranscription ? <ArticleOutlinedIcon /> : <CloseOutlinedIcon />
                }
            </Fab>
            <div style={{ display: 'flex', width: '100vw', height: '100vh' }}>
                <AgoraUIKit styleProps={{}}
                    rtcProps={{
                        appId: 'b6507a18c8b347239dd00d217624c8b2',
                        channel: 'channel1',
                        token: token.agoraToken,
                        role: isHost ? 'host' : 'audience',
                        layout: true,
                        enableScreensharing: false
                    }}
                    callbacks={{
                        EndCall: () => {
                            localStorage.removeItem('chat');
                            setIsCallHosted(false)
                            window.location.reload();
                        },
                    }}
                />
                {
                    openTranscription ? <Card elevation={0} style={{ width: '20vw', height: '100vh', border: '1px solid black' }}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                <Tab label="Transcription" {...a11yProps(0)} />
                                <Tab label="Transulation" {...a11yProps(1)} />
                            </Tabs>
                        </Box>
                        {
                            value === 0 ? <CardContent>
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                    {transcription}
                                </Typography>
                            </CardContent> : <></>
                        }
                        {
                            value === 1 ? <CardContent>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Language</InputLabel>
                                    <Select
                                        value={language}
                                        label="Language"
                                        onChange={(event)=>setLanguage(event.target.value)}
                                    >
                                        {
                                            languages.map((language)=>{
                                                return <MenuItem value={language.id}>{language.name}</MenuItem>
                                            })
                                        }
                                    </Select>
                                </FormControl>
                                <Typography style={{marginTop:'20px'}} sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                    {transulation}
                                </Typography>
                            </CardContent> : <></>
                        }
                    </Card> : <div />
                }
            </div>
        </div>
    );
}


export default CallView;
