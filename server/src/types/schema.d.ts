// tslint:disable
// graphql typescript definitions

declare namespace GQL {
    interface IGraphQLResponseRoot {
        data?: IQuery | IMutation;
        errors?: Array<IGraphQLResponseError>;
    }

    interface IGraphQLResponseError {
        /** Required for all errors */
        message: string;
        locations?: Array<IGraphQLResponseErrorLocation>;
        /** 7.2.2 says 'GraphQL servers may provide additional entries to error' */
        [propName: string]: any;
    }

    interface IGraphQLResponseErrorLocation {
        line: number;
        column: number;
    }

    interface IQuery {
        __typename: "Query";
        hello: string;
        bye2: string | null;
        bye: string | null;
    }

    interface IHelloOnQueryArguments {
        name?: string | null;
    }

    interface IMutation {
        __typename: "Mutation";
        login: Array<IError>;
        register: Array<IError> | null;
    }

    interface ILoginOnMutationArguments {
        email: string;
        password: string;
    }
    interface ISendForgotPasswordEmailOnMutationArguments {
        email: string;
    }

    interface IRegisterOnMutationArguments {
        email: string;
        password: string;
    }

    interface IStatus {
        __typename: "Status";
        message: string;
    }
    interface IError {
        __typename: "Error";
        path: string;
        message: string;
    }
    interface IErrorResponse {
        [index: number]: IError;
    }
}
// tslint:enable
