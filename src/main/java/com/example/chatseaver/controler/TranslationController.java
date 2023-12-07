package com.example.chatseaver.controler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.chatseaver.model.TranslationRequest;
import com.example.chatseaver.service.TranslationService;

@RestController
@RequestMapping("/api/translate")
@CrossOrigin
public class TranslationController {

    @Autowired
    TranslationService translationService;

    @PostMapping("translate")
    @CrossOrigin
    public String translate(@RequestBody TranslationRequest translationRequest) {
        String text = translationRequest.getText();
        String targetLanguage = translationRequest.getTargetLanguage();
        return translationService.translateText(text, targetLanguage);
    }
}

