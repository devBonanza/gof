import React from "react";

interface IframeworkBanner {
    data: {
        "BANNER_CONTAINER_X": number,
        "BANNER_CONTAINER_Y": number,
        "COMPONENTS": any
    }
}

export const frameworkBanner: IframeworkBanner = {
    data: {
        "BANNER_CONTAINER_X": 0,
        "BANNER_CONTAINER_Y": 0,
        "COMPONENTS": []
    }
};

export const BannerConfigurationContext = React.createContext(
    {}
);