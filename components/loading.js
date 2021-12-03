import ReactLoading from 'react-loading'
import Layout from './layout';

export default function Loading() {
    return (
        <Layout>
            <ReactLoading type={"bubbles"} color={"#9f2e17"} />
        </Layout>
    );
}