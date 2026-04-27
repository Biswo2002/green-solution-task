import React from 'react';
import { FlatList, FlatListProps, View, ActivityIndicator, Text } from 'react-native';

interface ZorrroFlatListProps<T> extends FlatListProps<T> {
    isLoading?: boolean;
    emptyMessage?: string;
    onEndReachedThreshold?: number;
    isFetchingMore?: boolean;
    onFetchMore?: () => void;
}

const ZorrroFlatList = <T,>({
    isLoading,
    isFetchingMore,
    onFetchMore,
    onEndReachedThreshold = 0.5,
    emptyMessage = '',
    ListFooterComponent,
    ...props
}: ZorrroFlatListProps<T>) => {
    if (isLoading) return <ActivityIndicator style={{ marginTop: 20 }} size="large" />;
    if (!props.data?.length) return <Text style={{ marginTop: 20, textAlign: 'center' }}>{emptyMessage}</Text>;

    return (
        <FlatList
            contentContainerStyle={{ paddingHorizontal: 16 }}
            onEndReached={onFetchMore}
            onEndReachedThreshold={onEndReachedThreshold}
            ListFooterComponent={
                isFetchingMore ? <ActivityIndicator style={{ marginVertical: 12 }} size="small" /> : ListFooterComponent
            }
            {...props}
        />
    );
};

export default ZorrroFlatList;