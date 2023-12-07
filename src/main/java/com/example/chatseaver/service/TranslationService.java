package com.example.chatseaver.service;
import com.google.cloud.translate.Translate;
import com.google.cloud.translate.TranslateOptions;
import com.google.cloud.translate.Translation;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class TranslationService {

    @Value("${google.translation.apiKey}")
    private String apiKey;

    public String translateText(String text, String targetLanguage) {
        Translate translate = TranslateOptions.newBuilder().setApiKey(apiKey).build().getService();

        Translation translation = translate.translate(text, Translate.TranslateOption.targetLanguage(targetLanguage));

        return translation.getTranslatedText();
    }
}
