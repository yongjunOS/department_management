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

    // 직원 등록 메서드 추가
    public boolean registerMember(MemberDTO memberDTO){
        return memberDao.registerMember(memberDTO) > 0;
    }

    // 직원 정보 수정 메서드
    public boolean updateMember(MemberDTO memberDTO) {
        return memberDao.updateMember(memberDTO) > 0;
    }

    //직원 삭제 메서드 추가
    public boolean deleteMember(String id){
     return memberDao.deleteMember(id) > 0;
    }


}
