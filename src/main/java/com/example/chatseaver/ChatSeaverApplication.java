package com.example.chatseaver;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.bind.annotation.CrossOrigin;

@SpringBootApplication
@CrossOrigin
@ComponentScan(basePackages = {"com.example.chatseaver.controler", "com.example.chatseaver.service"})
public class ChatSeaverApplication {

	public static void main(String[] args) {
		SpringApplication.run(ChatSeaverApplication.class, args);
	}

}
