package com.photoshareweb.dao;

import com.photoshareweb.entitys.Photo;

import java.util.List;

public interface PhotoMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table photo
     *
     * @mbggenerated
     */
    int deleteByPrimaryKey(Integer id);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table photo
     *
     * @mbggenerated
     */
    int insert(Photo record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table photo
     *
     * @mbggenerated
     */
    int insertSelective(Photo record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table photo
     *
     * @mbggenerated
     */
    Photo selectByPrimaryKey(Integer id);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table photo
     *
     * @mbggenerated
     */
    int updateByPrimaryKeySelective(Photo record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table photo
     *
     * @mbggenerated
     */
    int updateByPrimaryKey(Photo record);


    List<Photo> selectByClass(String photoClass);

    List<Photo> selectByAccount(String account);

    List<Photo> selectByStatus(String status);

    int updateStatusByID(Photo record);
}