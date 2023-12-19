package com.example.ecommerceBackend.repositories;

import com.example.ecommerceBackend.entities.enums.Role;
import com.example.ecommerceBackend.entities.UserEntity;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

@RunWith(SpringRunner.class)
@DataJpaTest
public class UserRepositoryTest {
    @Autowired
    private UserRepository userRepository;

    @Test
    public void testExistsByEmail(){
        UserEntity user = UserEntity.builder().email("test@email.com").password("password").role(Role.USER).build();
        userRepository.save(user);
        boolean exists = userRepository.existsByEmail("test@email.com");
        assertTrue(exists);
    }

    @Test
    public void testExistsByEmailNotFound(){
        boolean exists = userRepository.existsByEmail("test@email.com");
        assertFalse(exists);
    }

    @Test
    public void testFindByEmail(){
        UserEntity user = UserEntity.builder().email("test@email.com").password("password").build();
        userRepository.save(user);
        Optional<UserEntity> result = userRepository.findByEmail("test@email.com");
        assertThat(result).isPresent();
        assertThat(result).get().isEqualTo(user);
    }

    @Test
    public void testFindByEmailNotFound(){
        Optional<UserEntity> result = userRepository.findByEmail("test@email.com");
        assertThat(result).isNotPresent();
    }

}
