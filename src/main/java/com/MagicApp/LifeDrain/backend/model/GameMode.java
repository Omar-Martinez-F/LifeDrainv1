package com.magicapp.lifedrain.backend.model;

public enum GameMode {
    //modes
    STANDARD("Standard", 20, 2),
    COMMANDER("Commander",40,4);

    //fixed gamemodes and values
    private final String displayName;
    private final int startingLife;
    private final int defaultPlayers;


    GameMode(String displayName, int startingLife, int defaultPlayers){
        this.displayName = displayName;
        this.startingLife = startingLife;
        this.defaultPlayers = defaultPlayers;
    }

    public String getDisplayName(){
        return displayName;
    }

    public int getStartingLife(){
        return startingLife;
    }

    public int getDefaultPlayers(){
        return defaultPlayers;
    }

}
