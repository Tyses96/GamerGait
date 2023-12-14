package com.devty.GamerGait.controllers;

import com.devty.GamerGait.TestDataUtil;
import com.devty.GamerGait.domain.dto.GameDto;
import com.devty.GamerGait.domain.entities.GameEntity;
import com.devty.GamerGait.services.GameService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.List;

@SpringBootTest
@ExtendWith(SpringExtension.class)
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
@AutoConfigureMockMvc
public class GameControllerIntegrationTests {

    private GameService gameService;

    private MockMvc mockMvc;

    private ObjectMapper objectMapper;
    GameEntity gameEntityA;
    GameEntity gameEntityB;
    GameEntity gameEntityC;
    GameEntity gameEntityD;


    @Autowired
    public GameControllerIntegrationTests(MockMvc mockMvc, GameService gameService){
        this.mockMvc = mockMvc;
        this.gameService = gameService;
        this.objectMapper = new ObjectMapper();
    }

    @BeforeEach
    public void setup(){
        gameEntityA = TestDataUtil.createTestGameA();
        gameEntityB = TestDataUtil.createTestGameB();
        gameEntityC = TestDataUtil.createTestGameC();
        gameEntityD = TestDataUtil.createTestGameD();
    }

    @Test
    public void testThatCreateGameSuccessfullyReturnsHttp201Created() throws Exception {
        String gameJson = objectMapper.writeValueAsString(gameEntityA);
        mockMvc.perform(
                MockMvcRequestBuilders.post("/games")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(gameJson)
        ).andExpect(
                MockMvcResultMatchers.status().isCreated()
        );
    }

    @Test
    public void testThatGetGamesReturnsAllGames() throws Exception {
        mockMvc.perform(
                MockMvcRequestBuilders.get("/games")
                        .contentType(MediaType.APPLICATION_JSON)
        ).andExpect(
                MockMvcResultMatchers.status().isOk()
        );
    }
}
