package com.devty.GamerGait.repositories;

import com.devty.GamerGait.domain.entities.GaitTicketEntity;
import com.devty.GamerGait.domain.entities.GameDetailEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface GaitTicketRepository extends ListCrudRepository<GaitTicketEntity, Long> {

    @Query("Select t from GaitTicketEntity t where t.ownerId = ?1")
    List<GaitTicketEntity> findAllByOwnerId(UUID id);
}
