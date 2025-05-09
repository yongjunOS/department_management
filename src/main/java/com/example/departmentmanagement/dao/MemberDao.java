package com.example.departmentmanagement.dao;



import com.example.departmentmanagement.dto.MemberDTO;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface MemberDao {

    //반드시 xml에 있는 변수명과 일치해야 한다
    List<MemberDTO> allMember();
    MemberDTO findByIdAndPassword(String id, String password);

    // 직원 등록 메서드 추가
    int registerMember(MemberDTO memberDTO);

    //직원 수정 메서드
    int updateMember(MemberDTO memberDTO);

    //직원 삭제 메서드
    int deleteMember(String id);



}
