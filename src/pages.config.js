import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Blog from './pages/Blog';
import Products from './pages/Products';
import BlogPostDetail from './pages/BlogPostDetail'; 
import __Layout from './Layout.jsx';

export const PAGES = {
    "Dashboard": Dashboard,
    "Home": Home,
    "Blog": Blog,
    "Products": Products,
    "BlogPostDetail": BlogPostDetail, 
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};