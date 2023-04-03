import * as React from 'react';
import {BaseGameConfigurationContext, frameworkBaseGame} from './basegameconfiguration';

const withBaseGameConfiguration = <P extends object>(
    WrappedComponent: React.ComponentType<P>): React.FC<P> => {
    const HOC = (props: any): React.ReactElement => (
        <BaseGameConfigurationContext.Consumer>
            {(auth: any): React.ReactElement => {
                return (
                    <WrappedComponent {...props}{...frameworkBaseGame}/>
                );
            }}
        </BaseGameConfigurationContext.Consumer>
    );

    HOC.displayName = `withAuthentication(${WrappedComponent.displayName || WrappedComponent.name})`;
    HOC.WrappedComponent = WrappedComponent;
    return HOC;
};

export default withBaseGameConfiguration;