package com.example.demo.controller;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManagerFactory;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.Studentdetails;
import com.example.demo.model.industry;
import com.example.demo.repository.industryrepo;
import com.example.demo.service.industryservice;

@RestController
@CrossOrigin(origins = "*",allowedHeaders="*")
@RequestMapping("/industry")
public class IndustryController {
	@Autowired
	private industryrepo industryrepo;
	@Autowired
	private industryservice industryserv;
	@PostMapping("/add")
	public industry addIndystry(@RequestBody industry industry)
	{
		if(!industryrepo.addIndustry(industry.getStart_date())) {
			industryrepo.save(industry);
			return industryrepo.findById(industry.getId()).get();
		}
		System.out.print("choose different date\n");
		return null;
	}
	
	
	@GetMapping("/findall")
	public List<industry> findindustry()
	{
		System.out.println(industryrepo.findAll());
		return industryrepo.findAll();
	}
	
	@GetMapping("/getDateList")
	public List<Date> getDateList()
	{
		ArrayList<Date> datelist = new ArrayList<Date>();
		datelist.addAll(industryrepo.addFinalDates());
		return datelist;
	}
	
	@PostMapping("/findStudents")
	public List<Studentdetails> findStudents(@RequestBody industry industry)
	{
		return industryserv.findStudents(industry.getSkills());
	}
	
	@PostMapping("/findByDate")
	public List<industry> findIndustryByDate(@RequestBody industry industry)
	{
		return industryrepo.findIndustryByDate(industry.getStart_date(),industry.getFinal_date());
	}
	

	@PostMapping("/edit")
	public industry edit(@RequestParam("name") String name)
	{
		System.out.println(name);
	return industryrepo.edit(name);
	}
	@PostMapping("/findById")
	public industry findIndustryById(@RequestParam("id") int id)
	{	System.out.println(id);
		return industryrepo.findById(id).get();
	}
	 @PostMapping("/sortbypackage")
	 public List<industry> ByPackage()
	 {
		 return industryrepo.ByPackage();
	 }

}
