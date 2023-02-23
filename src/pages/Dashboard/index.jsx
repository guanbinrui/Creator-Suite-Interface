import { ProductList } from '../../components/ProductList'
import { Layout } from '../../components/Layout'

export function Dashboard() {
    return (
        <Layout>
            <ProductList title="Creations" />
        </Layout>
    )
}
