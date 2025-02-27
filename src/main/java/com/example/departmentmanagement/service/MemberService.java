package com.example.departmentmanagement.service;


import com.example.departmentmanagement.dao.MemberDao;
import com.example.departmentmanagement.dto.MemberDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class MemberService {

    @Autowired
    MemberDao memberDao;

  public List<MemberDTO> allMember(){
      return memberDao.allMember();
  }

    public MemberDTO login(String id, String password){
        return memberDao.findByIdAndPassword(id, password);
    }


}
