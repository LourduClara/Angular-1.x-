package com.example.DemoSpringBoot;

import org.springframework.stereotype.Controller;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

//import com.example.DemoSpringBoot.UserService;
@RestController
@RequestMapping("/all")
public class UserController {
	@Autowired
	private UserService userService;
	
	
	 @RequestMapping(value="/user",method = RequestMethod.GET)
	 public List<User> getAll(){
		 return userService.getAllUsers();
	 }
	    /*public String homepage(){
		
	        return "index";
	    }*/
	 

	  @RequestMapping(value = "/delete/{id}", method = RequestMethod.DELETE)
	    public void deleteUser(@PathVariable("id") int id)
	    {
		  userService.deleteById(id);
	       
	       
	    }
	  @RequestMapping(value = "/add", method = RequestMethod.POST) 
	  public User addUser(@RequestBody User user){
		  return userService.addUser(user); 
	  }
	  @RequestMapping(value="/edit",method= RequestMethod.PUT)
	  public User editUser(@RequestBody User user){
		return userService.updateUser(user);
		  
	  }
	  @RequestMapping(value="/get/{id}", method=RequestMethod.GET)
	  public User getById(@PathVariable("id")int id){
		return userService.getById(id);
	 
	  }
	  
}
