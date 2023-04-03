import * as React from 'react';
import {ReelContainerConfigurationContext, frameworkReelContainer} from './reelcontainerconfiguration';

const withReelContainerConfiguration = <P extends object>(
    WrappedComponent: React.ComponentType<P>): React.FC<P> => {
    const HOC = (props: any): React.ReactElement => (
        <ReelContainerConfigurationContext.Consumer>
            {(auth: any): React.ReactElement => {
                return (
                    <WrappedComponent {...props}{...frameworkReelContainer}/>
                );
            }}
        </ReelContainerConfigurationContext.Consumer>
    );

    HOC.displayName = `withAuthentication(${WrappedComponent.displayName || WrappedComponent.name})`;
    HOC.WrappedComponent = WrappedComponent;
    return HOC;
};

export default withReelContainerConfiguration;