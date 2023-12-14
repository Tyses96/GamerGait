package com.devty.GamerGait.controllers;

import com.devty.GamerGait.TestDataUtil;
import com.devty.GamerGait.domain.dto.ReviewDto;
import com.devty.GamerGait.services.ReviewService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

@SpringBootTest
@ExtendWith(SpringExtension.class)
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
@AutoConfigureMockMvc
public class ReviewControllerIntegrationTests {

    private ReviewService reviewService;

    private MockMvc mockMvc;

    private ObjectMapper objectMapper;

    @Autowired
    public ReviewControllerIntegrationTests(MockMvc mockMvc, ReviewService reviewService) {
        this.mockMvc = mockMvc;
        this.reviewService = reviewService;
        this.objectMapper = new ObjectMapper();
    }

    @Test
    public void testThatCreateAuthorSuccessfullyReturnsHttp201Created() throws Exception {
        ReviewDto testReviewA = TestDataUtil.createTestReviewDtoA(TestDataUtil.createTestGameDtoA());
        String reviewJson = objectMapper.writeValueAsString(testReviewA);

        mockMvc.perform(
                MockMvcRequestBuilders.put("/reviews/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(reviewJson)
        ).andExpect(
                MockMvcResultMatchers.status().isCreated()
        );
    }
}
