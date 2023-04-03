import * as React from 'react';
import {PlayerMessageConfigurationContext, frameworkPlayerMessage} from './playerMessageconfiguration';

const withPlayerMessageConfiguration = <P extends object>(
    WrappedComponent: React.ComponentType<P>): React.FC<P> => {
    const HOC = (props: any): React.ReactElement => (
        <PlayerMessageConfigurationContext.Consumer>
            {(auth: any): React.ReactElement => {
                return (
                    <WrappedComponent {...props}{...frameworkPlayerMessage}/>
                );
            }}
        </PlayerMessageConfigurationContext.Consumer>
    );

    HOC.displayName = `withAuthentication(${WrappedComponent.displayName || WrappedComponent.name})`;
    HOC.WrappedComponent = WrappedComponent;
    return HOC;
};

export default withPlayerMessageConfiguration;