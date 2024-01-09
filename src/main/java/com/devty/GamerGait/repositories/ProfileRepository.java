package com.devty.GamerGait.repositories;

import com.devty.GamerGait.domain.entities.ProfileEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface ProfileRepository extends ListCrudRepository<ProfileEntity, Long> {

    ProfileEntity findById(UUID id);
    @Query("Select u from ProfileEntity u where lower(u.email) like ?1")
    ProfileEntity findByEmail(String email);

}
