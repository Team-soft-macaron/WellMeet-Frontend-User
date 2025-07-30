import { useState, useEffect, useCallback } from 'react';

interface ApiState<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
}

interface UseApiOptions {
    immediate?: boolean;
    onSuccess?: (data: any) => void;
    onError?: (error: string) => void;
}

export function useApi<T>(
    apiFunction: (...args: any[]) => Promise<T>,
    options: UseApiOptions = {}
) {
    const [state, setState] = useState<ApiState<T>>({
        data: null,
        loading: false,
        error: null,
    });

    const execute = useCallback(
        async (...args: any[]) => {
            setState(prev => ({ ...prev, loading: true, error: null }));

            try {
                const data = await apiFunction(...args);
                setState({ data, loading: false, error: null });
                options.onSuccess?.(data);
                return data;
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : 'An error occurred';
                setState(prev => ({ ...prev, loading: false, error: errorMessage }));
                options.onError?.(errorMessage);
                throw error;
            }
        },
        [apiFunction]
    );

    const reset = useCallback(() => {
        setState({ data: null, loading: false, error: null });
    }, []);

    const setData = useCallback((data: T) => {
        setState(prev => ({ ...prev, data }));
    }, []);

    const setError = useCallback((error: string) => {
        setState(prev => ({ ...prev, error }));
    }, []);

    return {
        ...state,
        execute,
        reset,
        setData,
        setError,
    };
}

// Specialized hooks for common API patterns
export function useApiWithParams<T>(
    apiFunction: (params: any) => Promise<T>,
    initialParams?: any,
    options: UseApiOptions = {}
) {
    const [params, setParams] = useState(initialParams);
    const apiState = useApi(apiFunction, options);

    const execute = useCallback(
        async (newParams?: any) => {
            const finalParams = newParams || params;
            if (finalParams) {
                return apiState.execute(finalParams);
            }
        },
        [apiState.execute, params]
    );

    useEffect(() => {
        if (options.immediate && params) {
            execute();
        }
    }, [execute, options.immediate, params]);

    return {
        ...apiState,
        execute,
        params,
        setParams,
    };
}

export function useApiWithId<T>(
    apiFunction: (id: string) => Promise<T>,
    options: UseApiOptions = {}
) {
    const [id, setId] = useState<string | null>(null);
    const apiState = useApi(apiFunction, options);

    const execute = useCallback(
        async (newId?: string) => {
            const finalId = newId || id;
            if (finalId) {
                return apiState.execute(finalId);
            }
        },
        [apiState.execute, id]
    );

    useEffect(() => {
        if (options.immediate && id) {
            execute();
        }
    }, [execute, options.immediate, id]);

    return {
        ...apiState,
        execute,
        id,
        setId,
    };
} 
