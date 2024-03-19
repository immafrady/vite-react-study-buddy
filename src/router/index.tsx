import { createBrowserRouter } from 'react-router-dom'
import Layout from '@/layout'
import Home from '@/pages/home'
import ExamConfig from '@/pages/exam-config'
import { RouterName } from '@/router/types'
import AnswerSheet from '@/pages/answer-sheet'
import pkg from '../../package.json'

const router = createBrowserRouter([{
    element: <Layout />,
    children: [{
        path: RouterName.Home,
        element: <Home />
    }, {
        path: RouterName.ExamConfig,
        element: <ExamConfig />
    }, {
        path: RouterName.AnswerSheet,
        element: <AnswerSheet />
    }]
}], {
    basename: `/${pkg.name}/`
})
export default router;
