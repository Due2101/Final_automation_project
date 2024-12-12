import { Page } from '@playwright/test';
import path from 'path';
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

    protected async getInputValue(locator:string){
        return this.page.locator(locator).inputValue();
    }

    protected async getAttributeValueOfElement(locator:string,attributeName: string){
        return this.page.locator(locator).getAttribute(attributeName);

    }

    protected async reloadPage(){
        await this.page.reload();
    }

    protected async getNumberOfElement(locator:string){
        const elements = await this.page.$$(locator);
        //const elements = await this.page.locator(locator).all(); -- cách 2
        return elements.length;

    }

    protected async blurToElement(locator:string){
        await this.page.locator(locator).blur();
    }

    protected async uploadFile(locator: string,fileName:string){
        const pathToFile = path.resolve(__dirname, fileName);
        await this.page.locator(locator).setInputFiles(pathToFile);

    }

    protected async uploadMultipleFiles(locator:string, ...fileName:string[]){
        let filePaths:string[] =fileName.map(fileName =>path.resolve(__dirname,fileName));
        await this.page.locator(locator).setInputFiles(filePaths);
    }

    protected async scrollToPageTop(){
        await this.page.evaluate(() =>window.scrollTo({
            top:0,
            left:0,
            behavior: 'smooth'
        }));
    }

    protected async hideElement(locator:string){
        await this.page.locator(locator).evaluate(el =>el.style.display = 'none!important');

    }

    protected async redirectBack(){
        await this.page.goBack()
    }

    protected async redirectFoward(){
        await this.page.goForward()
    }

    protected async getPageSource(){
        return this.page.content();
    }

    protected async clickToElementInFrame(frameLocator:string, locator:string ){
        const frameElement = this.page.frameLocator(frameLocator);
        await frameElement.locator(locator).click();
    }

    protected async inputToElementInFrame(frameLocator:string, locator:string, inputValue:string ){
        const frameElement = this.page.frameLocator(frameLocator);
        await frameElement.locator(locator).click();
        await frameElement.locator(locator).fill(inputValue);
    }

    protected async waitForElementVisible(locator:string, timeout?:number){
        await this.page.locator(locator).waitFor({
            state:'visible',
            timeout:timeout
        })
    }

    protected async waitForElementInVisible(locator:string, timeout?:number){
        await this.page.locator(locator).waitFor({
            state:'hidden',
            timeout:timeout
        })
    }

    protected async waitForElementPresent(locator:string, timeout?:number){
        await this.page.locator(locator).waitFor({
            state:'attached',
            timeout:timeout
        })
    }

    protected async waitForElementStale(locator:string, timeout?:number){
        await this.page.locator(locator).waitFor({
            state:'detached',
            timeout:timeout
        })
    }

    protected async getTextOfAllElements(locator:string):Promise<string[]>{
        const elements = await this.page.locator(locator).all();
        const textOfElements:string[] =[];

        for(let i=0; i< elements.length; i++){
            textOfElements.push(await elements[i].innerText());
        }
        return textOfElements;

    }

    protected async waitForPageLoad(maxRetries: number) {
        try {
            await this.page.waitForSelector('html', { state: 'attached' });
            await this.page.waitForLoadState('domcontentloaded');

            for (let attempt = 0; attempt < maxRetries; attempt++) {
                const pageLoadStatus = await this.page.evaluate(() => document.readyState);
    
                if (pageLoadStatus === "complete") {
                    return;
                }

                // wait for a bit
                await this.page.waitForTimeout(500);
            }
           
            console.warn('Page did not reach "complete" status within retries')
        } catch (error) {
            console.log('Error waiting for page load: ', error);
        }
    }


}
    

