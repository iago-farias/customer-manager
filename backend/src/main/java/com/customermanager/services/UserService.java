package com.customermanager.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.customermanager.model.Role;
import com.customermanager.model.User;
import com.customermanager.repositories.RoleRespository;
import com.customermanager.repositories.UserRepository;

@Service
public class UserService {
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private RoleRespository roleRepository;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	public User findByUserName(String userName) {
		User user = userRepository.findByUserName(userName);
		
		return user;
	}
	
	public void initUsers() {
		Role adminRole = roleRepository.save(new Role("ADMIN"));
		Role userRole = roleRepository.save(new Role("USER"));
		
		User userAdmin = new User("admin", getEncodedPassword("123456"));
		User userCommon = new User("comum",getEncodedPassword("123456"));
		
		userAdmin.setRoles(Set.of(adminRole, userRole));
		userCommon.setRoles(Set.of(userRole));
		
		userRepository.save(userAdmin);
		userRepository.save(userCommon);
	}
	
	public List<String> getUserRoles(){
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		List<String> userRoles = new ArrayList<>();
		
		authentication.getAuthorities().forEach(role -> {
			userRoles.add(role.toString().replace("ROLE_", ""));
		});
		
		return userRoles;
	}
	
	private String getEncodedPassword(String password) {
		return passwordEncoder.encode(password);
	}
}
