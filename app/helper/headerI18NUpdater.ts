export const headerI18NUpdater = (component: any, langId: number) => {
  if (component.langId !== langId) {
    setTimeout(() => {
      component.langId = langId;
      component.props.navigation.setParams({langId: component.langId});
    }, 0);
  }
};
