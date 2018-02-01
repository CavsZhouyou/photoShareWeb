package com.photoshareweb.service;

import com.photoshareweb.dao.PhotoMapper;
import com.photoshareweb.entitys.Photo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service("photoService")
public class PhotoService {

    @Autowired
    private PhotoMapper photoDao;

    public List<Photo> getPhotoByClass(String photoClass){
        List<Photo> resultList = new ArrayList<Photo>();;
        resultList = photoDao.selectByClass(photoClass);

        return resultList;
    }
}