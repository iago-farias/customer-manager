package com.customermanager.exception;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(BusinessException.class)
    public ResponseEntity<String> handleBadRequestException(BusinessException ex) {
        // if you want you can do some extra processing with message and status of an exception 
        // or you can return it without any processing like this:
        return ResponseEntity.status(400).body(ex.getMessage());
    }
    
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidationRequestException(MethodArgumentNotValidException ex){
    	  Map<String, String> errors = new HashMap<>();
    	    ex.getBindingResult().getAllErrors().forEach((error) -> {
    	        String fieldName = ((FieldError) error).getField();
    	        String errorMessage = error.getDefaultMessage();
    	        errors.put(fieldName, errorMessage);
    	    });
    	    
            return ResponseEntity.status(400).body(errors);
    }
}