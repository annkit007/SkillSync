package com.skillsync.backend;

import com.theokanning.openai.OpenAiService;
import com.theokanning.openai.chat.ChatCompletionRequest;
import com.theokanning.openai.chat.ChatMessage;

import java.util.List;

public class OpenAITest {

    public static void main(String[] args) {
        String key = "sk-xxxxxxxxxxxxxxxxxxxx"; // put your actual OpenAI key here

        OpenAiService service = new OpenAiService(key);

        ChatCompletionRequest request = ChatCompletionRequest.builder()
                .model("gpt-3.5-turbo")
                .messages(List.of(new ChatMessage("user", "Hello from test")))
                .maxTokens(50)
                .build();

        var response = service.createChatCompletion(request);
        System.out.println(response.getChoices().get(0).getMessage().getContent());
    }
}
