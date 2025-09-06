package com.skillsync.backend.service;

import com.theokanning.openai.OpenAiService;
import com.theokanning.openai.completion.chat.ChatCompletionRequest;
import com.theokanning.openai.completion.chat.ChatMessage;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OpenAIService {

    private final OpenAiService service;

    public OpenAIService(@Value("${openai.api.key}") String apiKey) {
        this.service = new OpenAiService(apiKey);
        System.out.println("✅ OpenAI key loaded successfully.");
    }

    public String generateText(String prompt) {
        try {
            ChatCompletionRequest request = ChatCompletionRequest.builder()
                    .model("gpt-3.5-turbo")  // safer than davinci
                    .messages(List.of(new ChatMessage("user", prompt)))
                    .maxTokens(150)
                    .build();

            return service.createChatCompletion(request)
                    .getChoices()
                    .get(0)
                    .getMessage()
                    .getContent()
                    .trim();

        } catch (Exception e) {
            e.printStackTrace();
            return "Error calling OpenAI: " + e.getMessage();
        }
    }
}
