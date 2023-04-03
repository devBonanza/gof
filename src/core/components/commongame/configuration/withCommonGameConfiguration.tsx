import * as React from 'react';
import {CommonGameConfigurationContext, frameworkCommonGame} from './commongameconfiguration';

const withCommonGameConfiguration = <P extends object>(
    WrappedComponent: React.ComponentType<P>): React.FC<P> => {
    const HOC = (props: any): React.ReactElement => (
        <CommonGameConfigurationContext.Consumer>
            {(auth: any): React.ReactElement => {
                return (
                    <WrappedComponent {...props}{...frameworkCommonGame}/>
                );
            }}
        </CommonGameConfigurationContext.Consumer>
    );

    HOC.displayName = `withAuthentication(${WrappedComponent.displayName || WrappedComponent.name})`;
    HOC.WrappedComponent = WrappedComponent;
    return HOC;
};

export default withCommonGameConfiguration;