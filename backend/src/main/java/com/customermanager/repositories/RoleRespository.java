package com.customermanager.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.customermanager.model.Role;

public interface RoleRespository extends JpaRepository<Role, Long> {
}
