package com.example.DemoSpringBoot;

import java.util.List;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;

import org.springframework.stereotype.Service;

import com.example.DemoSpringBoot.User;


@Service
public class UserService  {
	static HashMap<Integer,User> userIdMap=new HashMap<Integer,User>();

	public UserService()
    {
        User empOne = new User(1,"Lourdu", "clara","clara.jeno@gmail.com",982379797,"Newt");
        User emptwo = new User(2,"Mary" , "priyanga","mary.prinky@gmail.com",997379797,"TCS");
        User empThree = new User(2,"Ria" , "Joe","ria.jeo@gmail.com",778900389,"MFT"); 
      
        userIdMap.put(1, empOne);
        userIdMap.put(2,emptwo);
        userIdMap.put(3,empThree);
       
       
    }
	  
	public void deleteById(int id) {
		
		userIdMap.remove(id);
	}
	public List<User> getAllUsers()
	{
		 List<User> users = new ArrayList<User>(userIdMap.values());
		return users;
	}
	/*public HashMap<Integer,User> userIdMap=new HashMap<Integer, User>();
	User user_1=new User(1,"lourdu", "clara",21/5/1995,982379797,"Newt");
	User user_2=new User(2,"mary" , "priyanga",16/9/1989,982379797,"tcs");
    userIdMap.put(1,user_1);
    userIdMap.put(2,user_2);*/
	/*public List<User> getAll(){
		return  users;

	}*/

	public User addUser(User user) {
		user.setId(getMaxId()+1);
		userIdMap.put(user.getId(), user);
		return user;
	}
	public static int getMaxId()
	{ 	 int max=0;
	for (int id:userIdMap.keySet()) {  
		if(max<=id)
			max=id;
	}  

	return max;
	}

	public User updateUser(User user) {

		if(user.getId()<=0)
			return null;
		userIdMap.put(user.getId(), user);
		return user;

	}

	public User getById(int id) {
		return userIdMap.get(id);
	}
}