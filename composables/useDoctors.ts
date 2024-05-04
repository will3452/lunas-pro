export const useDoctors = () => {

    const supabase = useSupabaseClient()
    const user = useSupabaseUser()

    const supaBaseTable = 'doctors'

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
					.or(`name.ilike.%${search}%x`);
				}
			const { data, error } = await queryData;
			let queryCount = supabase
				.from(supaBaseTable)
				.select('count', { count: 'exact' });
				if (search) {
					queryCount = queryCount
					.or(`name.ilike.%${search}%x`);
				}
			const { count } = await queryCount;
			return { data, count }
		},

        /**
         * method that will fetch the data
         * @returns 
         * @param options 
         * for reference table (ex: name, users ( name ))
         * 
         */
        async findAll( options?: any,where?: any) {
            return  await supabase
                    .from(supaBaseTable)
                    .select(options)
                    .eq('status',true)
        },

        /**
         * 
         * @param id  // primary id
         * @param options 
         * @returns 
        */
        async findByPk(id: number, options?: any) {
            return  await supabase
                    .from(supaBaseTable)
                    .select(options)
                    .eq('id',id)
        },

        /**
         * 
         * @param body 
         * @param options 
         * @returns 
         */
        async create(body: any = {}) {
            body.created_at = new Date()
            body.status = true
            return await supabase
            .from(supaBaseTable)
            .insert(body)
        },

        /**
         * 
         * @param body 
         * @param options 
         * @returns 
         */
        async createResponse(body: any = {}, options?: any) {
                body.created_at = new Date()
                body.status = true
                return await supabase
                .from(supaBaseTable)
                .insert(body)
                .select(options)
        },


        /**
         * 
         * @param id  
         * @param body 
         * @param options 
         * @returns 
         */
        async update(id: number, body: object = {}) {
            body.modified_at = new Date()
            return await supabase
            .from(supaBaseTable)
            .update(body)
            .eq('id', id)
        },

        /**
         * 
         * @param id  
         * @param body 
         * @param options 
         * @returns 
         */
        async updateResponse(id: number, body: object = {}) {
            body.modified_at = new Date()
            return await supabase
            .from(supaBaseTable)
            .update(body)
            .eq('id', id)
            .select()
        },

        /**
         * 
         * @param id  
         * @param body 
         * @param options 
         * @returns 
         */
        async delete(id: number) {
            return await supabase
            .from(supaBaseTable)
            .delete()
            .eq('id', id)
        },
        /**
         * 
         * @param id  
         * @param body 
         * @param options 
         * @returns 
         */
        async softDelete(id: number) {
            let body: { status?: boolean; deleted_at?: Date, modified_at?: Date } = {};
            body.status = false;
            body.deleted_at = new Date();
            body.modified_at = new Date();
            return await supabase
            .from(supaBaseTable)
            .update(body)
            .eq('id', id)
        },
    }
}