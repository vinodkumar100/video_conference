package com.example.chatseaver.model;

public class TranslationRequest {
    private String text;
    private String targetLanguage;
	public TranslationRequest(String text, String targetLanguage) {
		super();
		this.text = text;
		this.targetLanguage = targetLanguage;
	}
	public TranslationRequest() {
		super();
		// TODO Auto-generated constructor stub
	}
	public String getText() {
		return text;
	}
	public void setText(String text) {
		this.text = text;
	}
	public String getTargetLanguage() {
		return targetLanguage;
	}
	public void setTargetLanguage(String targetLanguage) {
		this.targetLanguage = targetLanguage;
	}
    
    
}
