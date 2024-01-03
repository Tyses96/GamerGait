package com.devty.GamerGait.repositories;

import com.devty.GamerGait.domain.entities.ProfileEntity;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface ProfileRepository extends ListCrudRepository<ProfileEntity, Long> {

    ProfileEntity findById(UUID id);
    ProfileEntity findByEmail(String email);

}
