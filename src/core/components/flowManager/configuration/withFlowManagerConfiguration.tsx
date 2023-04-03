import * as React from 'react';
import {FlowManagerConfigurationContext, frameworkFlowManager} from './flowManagerConfiguration';

const withFlowManagerConfiguration = <P extends object>(
    WrappedComponent: React.ComponentType<P>): React.FC<P> => {
    const HOC = (props: any): React.ReactElement => (
        <FlowManagerConfigurationContext.Consumer>
            {(auth: any): React.ReactElement => {
                return (
                    <WrappedComponent {...props}{...frameworkFlowManager}/>
                );
            }}
        </FlowManagerConfigurationContext.Consumer>
    );

    HOC.displayName = `withAuthentication(${WrappedComponent.displayName || WrappedComponent.name})`;
    HOC.WrappedComponent = WrappedComponent;
    return HOC;
};

export default withFlowManagerConfiguration;