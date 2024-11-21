import { Page } from '@playwright/test';
export default class BasePage {
    protected page: Page;
    constructor(page:Page) {
        this.page =page;
    }

    
    protected async clickToElement(locator: string){
        await this.highlight(locator);
        await this.page.click(locator);

    }

    protected async doubleClick(locator: string){
        await this.highlight(locator);
        await this.page.dblclick(locator);
    }

    protected async highlight(locator: string){
        let originalStyle:string;
        const element = this.page.locator(locator);
        await element.evaluate(el => originalStyle = el.style.border);
        await element.evaluate(el => el.style.border ='2px dashed red');
        await this.page.waitForTimeout(500);
        await element.evaluate(el => el.style.border =originalStyle);


    }

    protected async rightclick(locator: string){
        await this.highlight(locator);
        await this.page.locator(locator).click({button:'right'});
    }

    protected async middleclick(locator: string){
        await this.highlight(locator);
        await this.page.locator(locator).click({button:'middle'});
    }

    protected async fillElement(locator:string, inputvalue:string){
        await this.highlight(locator);
        await this.page.fill(locator,inputvalue);
    }

    protected async checkToElement(locator:string){
        await this.highlight(locator);
        await this.page.check(locator);

    }

    protected async unCheckToElement(locator:string){
        await this.highlight(locator);
        await this.page.uncheck(locator);

    }

    protected async hover(locator:string){
        await this.highlight(locator);
        await this.page.hover(locator);

    }
    
    protected async scroll(locator:string){
        await this.page.locator(locator).scrollIntoViewIfNeeded();

    }

    protected async getPageUrl(){
        return this.page.url();
    }

    protected async getElementText(locator:string){
        return this.page.locator(locator).innerText;
    }

    protected async isElementChecked(locator: string){
        return this.page.locator(locator).isChecked();
    }

    protected async isElementHidden(locator: string){
        return this.page.locator(locator).isHidden();
    }

    protected async isElementDisabled(locator: string){
        return this.page.locator(locator).isDisabled();
    }

    protected async isElementVisable(locator: string){
        return this.page.locator(locator).isVisible();
    }

    protected async isElementEditable(locator: string){
        return this.page.locator(locator).isEditable();
    }

    protected async redirectToUrl(url: string){
        await this.page.goto(url);
    }

    protected async selectToDropdown(locator:string, option:string){
        await this.page.locator(locator).selectOption({label:option})
    }



    
}
