package com.magicapp.lifedrain.backend.controller;

import com.magicapp.lifedrain.backend.model.GameMode;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.server.ResponseStatusException;


@Controller
public class GameController{
    @GetMapping("/")
    public String showSetup(Model model){
        model.addAttribute("gameModes",GameMode.values());

        return "setup";
    }

    @GetMapping("/game")
    public String showGame(@RequestParam GameMode mode, @RequestParam(name = "players") int playerCount, Model model){
        if(playerCount <1 || playerCount >4){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"Player count must be between 1 and 4");
        }

        model.addAttribute("mode",mode);
        model.addAttribute("playerCount",playerCount);
        model.addAttribute("startingLife",mode.getStartingLife());

        return "game";

    }
}