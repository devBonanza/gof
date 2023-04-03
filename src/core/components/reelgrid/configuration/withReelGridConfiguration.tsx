import * as React from 'react';
import {ReelGridConfigurationContext, frameworkReelGrid} from './reelgridconfiguration';

const withReelGridConfiguration = <P extends object>(
    WrappedComponent: React.ComponentType<P>): React.FC<P> => {
    const HOC = (props: any): React.ReactElement => (
        <ReelGridConfigurationContext.Consumer>
            {(auth: any): React.ReactElement => {
                return (
                    <WrappedComponent {...props}{...frameworkReelGrid}/>
                );
            }}
        </ReelGridConfigurationContext.Consumer>
    );

    HOC.displayName = `withAuthentication(${WrappedComponent.displayName || WrappedComponent.name})`;
    HOC.WrappedComponent = WrappedComponent;
    return HOC;
};

export default withReelGridConfiguration;