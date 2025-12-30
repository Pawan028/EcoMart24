import { apiSlice } from './apiSlice';

const ADDRESSES_URL = '/api/addresses';

export const addressApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAddresses: builder.query({
            query: () => ({
                url: ADDRESSES_URL,
            }),
            keepUnusedDataFor: 5,
            providesTags: ['Address'],
        }),
        getAddressById: builder.query({
            query: (id) => ({
                url: `${ADDRESSES_URL}/${id}`,
            }),
            keepUnusedDataFor: 5,
        }),
        createAddress: builder.mutation({
            query: (data) => ({
                url: ADDRESSES_URL,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Address'],
        }),
        updateAddress: builder.mutation({
            query: (data) => ({
                url: `${ADDRESSES_URL}/${data.id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Address'],
        }),
        deleteAddress: builder.mutation({
            query: (id) => ({
                url: `${ADDRESSES_URL}/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Address'],
        }),
        setDefaultAddress: builder.mutation({
            query: (id) => ({
                url: `${ADDRESSES_URL}/${id}/default`,
                method: 'PUT',
            }),
            invalidatesTags: ['Address'],
        }),
    }),
});

export const {
    useGetAddressesQuery,
    useGetAddressByIdQuery,
    useCreateAddressMutation,
    useUpdateAddressMutation,
    useDeleteAddressMutation,
    useSetDefaultAddressMutation,
} = addressApiSlice;
