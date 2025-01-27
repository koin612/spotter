import { SpotterOptionExecutionCounter, SpotterHistoryRegistry, SpotterNativeModules } from '../core';

export class HistoryRegistry implements SpotterHistoryRegistry {
  private nativeModules: SpotterNativeModules;
  private STORAGE_KEY = 'SPOTTER_HISTORY';
  private defaultValue: SpotterOptionExecutionCounter = {};

  constructor(nativeModules: SpotterNativeModules) {
    this.nativeModules = nativeModules;
  }

  async getOptionExecutionCounter(): Promise<SpotterOptionExecutionCounter> {
    const history = await this.nativeModules.storage.getItem<SpotterOptionExecutionCounter>(this.STORAGE_KEY);
    return history ?? this.defaultValue;
  }

  async increaseOptionExecutionCounter(optionTitle: string) {
    const currentValue = await this.getOptionExecutionCounter();
    const nextHistory = {
      ...currentValue,
      ...({ [optionTitle]: currentValue[optionTitle] ? currentValue[optionTitle] + 1 : 1 })
    };

    this.nativeModules.storage.setItem(this.STORAGE_KEY, nextHistory);
  }

}
