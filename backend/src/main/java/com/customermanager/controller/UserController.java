package com.customermanager.controller;

import java.util.List;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.customermanager.services.UserService;

@RestController
@RequestMapping(value = "/user")
public class UserController {
	@Autowired
	private UserService userService;
	
	@PostConstruct
	public void createUsers() {
		//userService.initUsers();
	}
	
	@GetMapping("/roles")
	public ResponseEntity<List<String>> getUserRoles(){
		List<String> roles = userService.getUserRoles();
		
		return ResponseEntity.ok(roles);
	}
}
