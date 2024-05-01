export const useMedicineTypes = () => {

	const supabase = useSupabaseClient()
	const user = useSupabaseUser()

	const supaBaseTable = 'medicine_types'

	return {
		async paginationData(page = 0, pageCount = 7, search = null) {
			const offset = (page - 1) * pageCount;
			let queryData = supabase
				.from(supaBaseTable)
				.select()
				.order('created_at', { ascending: false })
				.range(offset, pageCount + offset - 1)
				if (search) {
					queryData = queryData
					.or(`name.ilike.%${search}%,description.ilike.%${search}%`);
				}
			const { data, error } = await queryData;
			let queryCount = supabase
				.from(supaBaseTable)
				.select('count', { count: 'exact' });
				if (search) {
					queryCount = queryCount
					.or(`name.ilike.%${search}%,description.ilike.%${search}%`);
				}
			const { count } = await queryCount;
			return { data, count }
		},
		async update(body = {}) {
			body.modified_at = new Date()
            return await supabase
            .from(supaBaseTable)
			.update(body)
            .eq('id', body.id)
        },
	}
}