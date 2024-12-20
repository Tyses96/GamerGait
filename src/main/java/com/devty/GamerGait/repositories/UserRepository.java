package com.devty.GamerGait.repositories;

import com.devty.GamerGait.domain.entities.UserEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface UserRepository extends ListCrudRepository<UserEntity, Long> {

    @Query("Select u from UserEntity u where lower(u.email) like ?1")
    UserEntity findByEmail(String email);

    @Query("Select u from UserEntity u where lower(u.username) like ?1")
    UserEntity findByUsername(String username);

}
