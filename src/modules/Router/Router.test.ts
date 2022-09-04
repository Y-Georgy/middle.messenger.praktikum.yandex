import { expect } from "chai";
import Component from "../Core/Component";
import { router } from "./Router";
import { JSDOM } from "jsdom";

describe('Проверяем переходы у Роута', () => {
  beforeEach(() => {
    const dom = new JSDOM(
      '<!DOCTYPE html><body><main id="main"></main></body>',
      { url: 'http://localhost:3000' }
    );

    (global as any).window = dom.window;
    global.document = dom.window.document;
  })

  router
    .use("/testPathOne", {} as Component)
    .use("/testPathTwo", {} as Component)
    .start();

  it('Переход на новую страницу должен менять состояние сущности history', () => {
    router.go("/testPathOne");
    router.go("/testPathTwo");

    expect(router.history.length).to.eq(3);
  });
});