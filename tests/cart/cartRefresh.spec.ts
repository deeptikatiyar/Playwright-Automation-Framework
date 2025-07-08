import { taggedLogin } from '@/utils/taggedLoginHelper';
import { CartPage } from '@/pages/CartPage';

taggedLogin('smoke', 'validate item is still in the cart after refresh', async({loggedInPage}) => {
    const cartPage = new CartPage(loggedInPage);
    await cartPage.addDefaultProductToCart();
    await cartPage.goToCart();

    await cartPage.verifyItemInCart();
    await loggedInPage.reload();
    await cartPage.assertItemCount(1);

});