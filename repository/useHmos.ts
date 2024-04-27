export const useHmos = () => {

    const supabase = useSupabaseClient()

    const supaBaseTable = 'hmos'

    return {
        /**
         * method that will fetch the data
         * @returns 
         * @param options 
         * for reference table (ex: name, users ( name ))
         * 
         */
        async findAll( options?: any) {
            return  await supabase
                    .from(supaBaseTable)
                    .select(options)
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
            await supabase
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

    }
}