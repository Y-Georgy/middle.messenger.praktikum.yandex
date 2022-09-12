import { expect } from "chai";
import Component from "../Core/Component";
import { Router } from "./Router";
import { JSDOM } from "jsdom";

describe('Проверяем переходы у Роута', () => {
  const getRouterTest = () => {
    const router = new Router('#main')
    router
      .use("/testPathOne", { getContent: () => '' } as unknown as Component)
      .use("/testPathTwo", { getContent: () => '' } as unknown as Component)
      .start();
    return router;
  }

  beforeEach(() => {
    const dom = new JSDOM(
      '<!DOCTYPE html><body><main id="main"></main></body>',
      { url: 'http://localhost:3000' }
    );

    (global as any).window = dom.window;
    global.document = dom.window.document;
  })

  it('После добавлении нового Роута, его можно найти ', () => {
    const router = getRouterTest();
    expect(router.getRoute("/testPathTwo")).not.to.be.undefined;
  });

  it('Переход на новую страницу должен менять состояние сущности history', () => {
    const router = getRouterTest();

    router.go("/testPathOne");
    router.go("/testPathTwo");

    expect(router.history.length).to.eq(3);
  });
});
