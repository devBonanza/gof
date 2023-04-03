import * as React from 'react';
import {TransitionLayerConfigurationContext, frameworkTransitionLayer} from './transitionLayerconfiguration';

const withTransitionLayerConfiguration = <P extends object>(
    WrappedComponent: React.ComponentType<P>): React.FC<P> => {
    const HOC = (props: any): React.ReactElement => (
        <TransitionLayerConfigurationContext.Consumer>
            {(auth: any): React.ReactElement => {
                return (
                    <WrappedComponent {...props}{...frameworkTransitionLayer}/>
                );
            }}
        </TransitionLayerConfigurationContext.Consumer>
    );

    HOC.displayName = `withAuthentication(${WrappedComponent.displayName || WrappedComponent.name})`;
    HOC.WrappedComponent = WrappedComponent;
    return HOC;
};

export default withTransitionLayerConfiguration;